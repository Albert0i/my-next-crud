using System;
using System.Collections.Generic;
using System.Net;
using Newtonsoft.Json;

public partial class WebClient2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        GridView1.DataSource = CallAPI();
        GridView1.DataBind();
    }

    protected List<ResultRowType> CallAPI()
    {
        string SERVICE_URL = "http://10.1.110.111:3000/api/blogs";
        string retJSON = "";

        try
        {
            using (WebClient webClient = new WebClient())
            {
                webClient.Headers.Add("Content-Type", "application/json; charset=utf-8");

                retJSON = webClient.DownloadString(SERVICE_URL);
                ResultType r = JsonConvert.DeserializeObject<ResultType>(retJSON);
                if (r.message == "OK")
                {
                    Label1.Text = String.Format("OK ({0})", r.posts.Count);
                    return r.posts;
                }

                return null;
            }
        }
        catch (WebException ex)
        {
            throw ex;
        }
    }

    public class ResultRowType
    {
        public int id { get; set; }
        public string title { get; set; }
        public string desc { get; set; }
    }

    public class ResultType
    {
        public string message { get; set; }
        public List<ResultRowType> posts { get; set; }
    }
}