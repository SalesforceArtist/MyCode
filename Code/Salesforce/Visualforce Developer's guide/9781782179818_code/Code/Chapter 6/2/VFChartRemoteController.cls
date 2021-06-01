public class VFChartRemoteController {

@RemoteAction
public static List<PieChartData> getRemotePieData() {
List<PieChartData> data = new List<PieChartData>();
data.add(new PieChartData('Jan', 30));
data.add(new PieChartData('Feb', 15));
data.add(new PieChartData('Mar', 10));
data.add(new PieChartData('Apr', 20));
data.add(new PieChartData('May', 20));
data.add(new PieChartData('Jun', 5));
return data;
}

// Wrapper class
    public class PieChartData {
        public String name { get; set; }
        public Integer data { get; set; }
        
        public PieChartData(String name, Integer data) {
        this.name = name;
        this.data = data;
        }
    }
}