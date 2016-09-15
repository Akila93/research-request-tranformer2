package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by akila on 8/23/16.
 */
public class Request {
    private HashMap<String,Object> request;
    private String appId;

    public Request(HashMap<String,Object> request) {
        this.setRequest(request);
    }
    public Request(){}

    @JsonProperty
    public HashMap<String,Object> getRequest() {
        return request;
    }

    public void setRequest(HashMap<String,Object> request) {
        this.request = request;
    }

    @JsonProperty
    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }
}
