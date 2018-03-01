// a smart component, in this case fetching data.

//here is the url for the api to retrieve json data
// const server ='https://play.dhis2.org/demo/api';
// const server = 'https://play.dhis2.org/test/api';
// const basicAuth = `Basic ${btoa('admin:district')}`;
// new site with relevant data for stocks
const server = 'https://inf5750.dhis2.org/demo/api';
// const server = 'https://inf5750.dhis2.org/training/api';
const basicAuth = `Basic ${btoa('student:INF5750!')}`;

const namespace = 'mystck'

//Send GET request to server/path. With standard header
export function getRequest(path){
    return fetch(`${server}/${path}`, {
        method: 'GET',
        headers: {
            'Authorization': basicAuth,
            'Content-Type': 'application/json?paging=false',
        },
      })
}

//Send request to server/path. Then convert to json
export function getJson(path){
    return getRequest(path).then(response => response.json())
}

//Send POST request to server/path. With standard header
function postRequest(path, payload) {
    return fetch(`${server}/${path}`,{
        method: 'POST',
        headers: {
            'Authorization': basicAuth,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: payload
      })
}

//Send PUT request to server/path. With standard header
function putRequest(path, payload) {
    return fetch(`${server}/${path}`,{
        method: 'PUT',
        headers: {
            'Authorization': basicAuth,
            'Content-Type': 'application/json'
        },
        body: payload
      })
}

//Send DELETE request to server/path. With standard header
function deleteRequest(path) {
    return fetch(`${server}/${path}`, {
    method: 'DELETE',
    headers: {
    'Authorization': basicAuth,
    'Accept': 'application/json'}
    })
}

//Get all data elements on the server
export function getAllDataElements(){
    return getJson('dataElements.json?paging=false')
        .then(({ dataElements }) => dataElements);
}

//Get all org units on the server
export function getAllOrgUnits(){
    return getJson('organisationUnits.json?paging=false')
        .then(({ organisationUnits }) => organisationUnits);
}


//Fetch the stocks from our data store
export function getAdminStocks(){
  return getRequest(`dataStore/${namespace}/`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Could not get admin stock data from server');
          }

        })
}

//Get all indicators in the database
export function getAllIndicators(){
        return getJson('/indicators.json?paging=false')
        .then(({ indicators }) => indicators);
}

//Get authoroties of current user.
export function getAuthoroties(){
    return getJson('25/me/authorities')
}

//Fetches the properties from our namespace for the chosen stock
export function getStockDataValues(stock){
    const dimension=stock.value;
    return getRequest(`/dataStore/${namespace}/${dimension}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Could not get stock value data from server');
        }
    })
}

//Looks up requested data for requested organistations over the given period.
export function getAllStockData(data,selOrgunits,period){
    // create the dimension string for the 3 ids end, start, received
    // const dimension=data.value+';'+data.startId+';'+data.receivedId;
     var orgunit='';
    const dimension=data;
    if(selOrgunits.length > 0){
        selOrgunits.forEach((unit) => {
            orgunit+=unit.value+";";
        });
    }
    return getRequest(`analytics?dimension=dx:${dimension}&dimension=pe:${period}&dimension=ou:${orgunit}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Could not get data from server');
        }
    })
}

//Store data at key in our namespace
export function store(key, data){
    var path = '25/dataStore/' + namespace + '/' + key
    var jsonData = JSON.stringify(data)
    return getRequest(path).then((response) => {
        if (response.ok) return putRequest(path, jsonData)
        else return postRequest(path, jsonData)
    })
    .then((response) => response.ok ? Promise.resolve() : Promise.reject())
}

//Delete data belonging to key in namespace
export function deleteItem(key) {
    let path = '25/dataStore/' + namespace + '/' + key;
    return deleteRequest(path)
    .then((response) => (response.ok ? Promise.resolve() : Promise.reject()));
}

//Get data at key in our namespace from server
export function getData(key){
    return getJson('25/dataStore/' + namespace + '/' + key)
}

export function getUserData(key){
    return getJson('userDataStore/' + namespace + '/' + key)
}

export function storeUserData(key, data){
    var path = 'userDataStore/' + namespace + '/' + key
    var jsonData = JSON.stringify(data)
    return getRequest(path)
    .then((response) => {
        console.log("Response to get: " + response)
        if (response.ok) return putRequest(path, jsonData)
        else return postRequest(path, jsonData)
    })
    .then((response) => response.ok ? Promise.resolve() : Promise.reject())
}
