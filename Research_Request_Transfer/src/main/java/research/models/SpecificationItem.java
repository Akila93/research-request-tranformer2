package research.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

/**
 * Created by akila on 8/23/16.
 */
public class SpecificationItem {

    private String key;
    private String keyFormatter;
    private String valueFormatter;
    private String valueType;

    public SpecificationItem(){

    }

    public SpecificationItem(String key, String keyFormatter, String valueFormatter,String valueType){
        this.setKeyFormatter(keyFormatter);
        this.setKey(key);
        this.setValueFormatter(valueFormatter);
        this.setValueType(valueType);

    }


    @JsonProperty
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @JsonProperty
    public String getKeyFormatter() {
        return keyFormatter;
    }

    public void setKeyFormatter(String keyFormatter) {
        this.keyFormatter = keyFormatter;
    }
    @JsonProperty
    public String getValueFormatter() {
        return valueFormatter;
    }

    public void setValueFormatter(String valueFormatter) {
        this.valueFormatter = valueFormatter;
    }

    @JsonProperty
    public String getValueType() {
        return valueType;
    }

    public void setValueType(String valueType) {
        this.valueType = valueType;
    }
}
