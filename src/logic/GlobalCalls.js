//To make the code more readable we are going around the react system for some components that are far away from each other
//All components that need it have access to an instance of GlobalCalls so they can communicate
class GlobalCalls{
    //Refreshes the stock list (after it has been updated on the server)
    refreshStocks(){
        setTimeout(this.stockList.refresh, 1000);
    }

    //Set component responsible for displaying stocks
    setStockSelector(stockSelector){
        this.stockList = stockSelector;
    }

    //Set component responsible for the user menu
    setMenuContainer(menuContainer) {
	this.menuContainer = menuContainer;
    }

    //Add input to the user menu
    autofillInput(input) {
	this.menuContainer.autofillInput(input);
    }

    //Display an estimates plot with the given input
    createEstimatesPlot(xseries, yseries, min, max, stockname, properties){
        this.plotContainer.createEstimatesPlot(xseries, yseries, min, max, stockname, properties);
    }

    //Display a timetrend plot with the given input
    createTimeTrendPlot(xseries, yseries, min, max, stockname, orgname, properties){
        this.plotContainer.createTimeTrendPlot(xseries, yseries, min, max, stockname, orgname, properties);
    }

    //Set component responsible for plotting
    setPlotContainer(plotContainer){
        this.plotContainer = plotContainer;
    }
}

export default new GlobalCalls()
