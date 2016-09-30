package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import java.util.HashMap;

/**
 * Created by akila on 8/23/16.
 */
public class Request {
    private HashMap<String,Object> requestBody;
    @Id
    private String appId;

    public Request(HashMap<String,Object> requestBody) {
        this.setRequestBody(requestBody);
    }
    public Request(){}

    @JsonProperty
    public HashMap<String,Object> getRequestBody() {
        return requestBody;
    }

    public void setRequestBody(HashMap<String,Object> requestBody) {
        this.requestBody = requestBody;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }
}
