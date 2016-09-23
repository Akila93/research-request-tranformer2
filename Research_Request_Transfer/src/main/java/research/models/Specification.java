package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by nuwantha on 8/26/16.
 */
public class Specification {

    @Id
    private String  appId;

    ArrayList<SpecificationItem> list;
    private Date created;


    public Specification(){
        this.setCreated(new Date());
    }
    public Specification(ArrayList<SpecificationItem> list) {
        this.list = list;
    }

    @JsonProperty
    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    @JsonProperty
    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }


    @JsonProperty
    public ArrayList<SpecificationItem> getList() {
        return list;
    }

    public void setList(ArrayList<SpecificationItem> list) {
        this.list = list;
    }


}
