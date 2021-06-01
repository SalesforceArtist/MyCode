public class ComplexChartController{
    
    // Return a list of data points for a chart
    public List<ChartData> getVFChartData() {
        return ComplexChartController.getComplexChartData();
    }
    
    // Make the chart data available via JavaScript remoting
    @RemoteAction
    public static List<ChartData> getRemoteVFChartData() {
        return ComplexChartController.getComplexChartData();
    }
  
    // The actual chart data; needs to be static to be
    // called by a @RemoteAction method
    public static List<ChartData> getComplexChartData() {
        List<ChartData> data = new List<ChartData>();
        data.add(new ChartData('RAM', 1300, 1275, 2534));
        data.add(new ChartData('Hard Disk', 1234, 2431, 1534));
        data.add(new ChartData('VGA Card', 2634, 2500, 2376));
        data.add(new ChartData('Mouse', 1765, 2000, 1432));
        data.add(new ChartData('USB D 16BG', 967, 932, 1450));
        data.add(new ChartData('USB D 32BG', 500, 765, 1768));        
        return data;
    }
    // Wrapper class
    public class ChartData{
        public String name { get; set; }
        public Integer data1 { get; set; }
        public Integer data2 { get; set; }
        public Integer data3 { get; set; }
        
        public ChartData(String name, Integer data1, Integer data2, Integer data3) {
            this.name = name;
            this.data1 = data1;
            this.data2 = data2;
            this.data3 = data3;
        }
    }
}