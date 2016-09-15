package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by nuwantha on 8/26/16.
 */
public class Specification {
    private String appId;
    ArrayList<SpecificationItem> list;
    private Date created;

    @JsonProperty
    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }
    @JsonProperty
    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }



    public Specification(){
        this.setCreated(new Date());
    }
    public Specification(ArrayList<SpecificationItem> list) {
        this.list = list;
    }

    @JsonProperty
    public ArrayList<SpecificationItem> getList() {
        return list;
    }

    public void setList(ArrayList<SpecificationItem> list) {
        this.list = list;
    }
}
