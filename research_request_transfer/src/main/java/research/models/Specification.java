package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.annotation.Id;
import research.ResearchRequestTransferApplication;

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

    private static final Logger logger= LoggerFactory.getLogger(Specification.class);

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
