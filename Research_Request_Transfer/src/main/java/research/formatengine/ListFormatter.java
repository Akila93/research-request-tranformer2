package research.formatengine;
import java.util.HashMap;
import java.util.List;

/**
 * Created by nuwantha on 10/7/16.
 */
public class ListFormatter {
    public int calculateTotal(Object objectList,String operationKey){
        int total=0;
        List<Object> objectItemList = (List<Object>) objectList;
        for(int i=0;i<objectItemList.size();i++){
            HashMap<String, String> map = (HashMap<String, String>)objectItemList.get(i);
            String value = map.get(operationKey);
            total+=Integer.parseInt(value);
        }
        return total;

    }

}
