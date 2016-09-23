package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import java.util.HashMap;

/**
 * Created by akila on 8/23/16.
 */
public class Request {
    private HashMap<String,Object> request;
    @Id
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

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }
}
