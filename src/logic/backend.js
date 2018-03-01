import {getJson} from '../logic/api'

//Converts period from our format to dhis format
export function calcPeriodStr(fromYear,fromMonth,toYear,toMonth){
  var strPeriod='';
  var lastMonth,startMonth;
     for (var year=fromYear;year<=toYear;year++){
	    if (year===toYear){
	      lastMonth=toMonth;
      }
      else {
	     lastMonth=12;
	    }
      if (year===fromYear){
        startMonth=fromMonth;
      }
      else {
        startMonth=1;
      }
      for (var month=startMonth;month<=lastMonth;month++){
        month=parseInt(month,10);
        if(month<10){
          strPeriod+=year+'0'+month+';';
        }
        else {
          strPeriod+=year+''+month+';';
        }       }
     }
    return strPeriod
}

//Fetches data from the dhis server corresponding to the given properties.
export function fetchData(properties){
  if (properties.mode === "estimates"){
    return fetchEstimatesData(properties)
  }
  else {
    return fetchTimeTrendData(properties)
  }
}

//Returns output from dhis call(s) on format:
//{availabilityData, usageData}
function fetchEstimatesData(properties){
  var orgunit='';

  let period = calcPeriodStr(properties.fromYear, properties.fromMonth, properties.toYear, properties.toMonth)

  // organize the orguntis
   if(properties.orgIDs.length > 0){
     properties.orgIDs.forEach((id) => {
       orgunit+=id+";";
     });
   }

  let path = `analytics?dimension=dx:${properties.availability_id};${properties.usage_id}&dimension=pe:${period}&dimension=ou:${orgunit}`
  console.log("Estimatesdata path: ",path);
  return getJson(path).then((data) => ({availabilityData: data}))
}

//Returns output from dhis call(s) on format:
//{availabilityData}
function fetchTimeTrendData(properties){
  let period = calcPeriodStr(properties.fromYear, properties.fromMonth, properties.toYear, properties.toMonth)
  let path = `analytics?dimension=dx:${properties.availability_id}&dimension=pe:${period}&dimension=ou:${properties.orgID}`
  return getJson(path).then((data) => ({availabilityData: data}))
}

//Takes raw data from dhis server and returns the relevant data formatted so it can be used in plotting.
//Returns object containing {xSeries, ySeries}
export function createXYSeries(data, properties){
  if (properties.mode === "estimates"){
    return createEstimatesXYSeries(data, properties)
  }
  else {
    return createTimeTrendXYSeries(data, properties)
  }
}

function createEstimatesXYSeries(data, properties){

  //Aggregation: {id: {name: orgName, sum: total used in period, counter: datapoints in period}}
  let aggregation = {}

  //Initialize aggregation
  properties.orgIDs.forEach((id, index) => aggregation[id] = {sum: 0, counter: 0, name: properties.orgnames[index]})

  //Split data by usage and availability
  let availabilityData = data.availabilityData.rows.filter(row => row[0] === properties.availability_id)
  let usageData = data.availabilityData.rows.filter(row => row[0] === properties.usage_id)

  //Aggregate usage data
  usageData.forEach(row => {
    aggregation[row[2]].sum += parseFloat(row[3]);
    aggregation[row[2]].counter++;
  })

  //Fill up x/y series
  let xSeries = []
  let ySeries = []
  let i = 0;
  for (let id in aggregation){
    //Find availability data for this organisation
    let organisationAvailability = availabilityData.filter(row => row[2] === id);

    //If insufficient data to create graph
    if (organisationAvailability.length === 0 || aggregation[id].sum === 0){
      ySeries[i] = []
      xSeries[i] = aggregation[id].name + "<br/>(Insufficient data)"
    }
    else{
      //Find availability for last datapoint for organisation
      organisationAvailability.sort();
      let finalData = organisationAvailability[organisationAvailability.length - 1]

      let finalDate = dhisDateToReadable(finalData[1]);
      let finalBalance = parseFloat(finalData[3]);

      //Organisation names
      xSeries[i] = aggregation[id].name + "<br/>(" + finalDate + ")";

      //Estimated months of supply
      ySeries[i] = finalBalance*aggregation[id].counter/aggregation[id].sum;
    }
    i++;
  }
  return {xSeries: xSeries, ySeries: ySeries}
}

function createTimeTrendXYSeries(data, properties) {
  //If insufficient data to create graph
  if (data.availabilityData.rows.length === 0) {
    return {xSeries: ["<br/>(Insufficient data)"], ySeries: []}
  }
  else{
    data.availabilityData.rows.sort() //Due to the format of the date alphabetic ordering sorts it (from early date to late date)!
    let xSeries = data.availabilityData.rows.map((row) => (dhisDateToReadable(row[1])));
    let ySeries = data.availabilityData.rows.map((row) => parseFloat(row[3]))
    return {xSeries: xSeries, ySeries: ySeries}
  }
}

//Takes a string on the format representing a month on the format YYYYMM and it on the format MM-YYYY
function dhisDateToReadable(dhisDate){
  return dhisDate.substr(4,6) + "-" + dhisDate.substr(0,4);
}
