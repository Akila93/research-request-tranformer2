package research.formatengine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import research.ResearchRequestTransferApplication;
import research.annotation.Format;

import java.util.HashMap;
import java.util.List;

/**
 * Created by nuwantha on 10/7/16.
 */
public class ListFormatter implements Formatter{

    private static final Logger logger= LoggerFactory.getLogger(ListFormatter.class);
    @Format(methodTask = "total")
    public int calculateTotal(Object objectList,String operationKey,String valueInputFormat){
        int total=0;
        System.err.println(objectList);
        if(valueInputFormat.equals("objectList")) {
            List<Object> objectItemList = (List<Object>) objectList;
            for (int i = 0; i < objectItemList.size(); i++) {
                HashMap<String, String> map = (HashMap<String, String>) objectItemList.get(i);
                String value = map.get(operationKey);
                total += Integer.parseInt(value);
            }
        }else if(valueInputFormat.equals("valueList")){
            System.out.println(objectList);
            List<Integer> valueList = (List<Integer>) objectList;
            System.out.println(valueList);
            for (int i = 0; i < valueList.size(); i++) {
                total += valueList.get(i);
                System.out.println(total);
            }
        }
        return total;
    }

    @Format(methodTask = "avg")
    public double calculateAvg(Object objectList,String operationKey,String valueInputFormat){
        int total=0;
        double avg=0;
        if(valueInputFormat.equals("objectList")) {
            List<Object> objectItemList = (List<Object>) objectList;
            for (int i = 0; i < objectItemList.size(); i++) {
                HashMap<String, String> map = (HashMap<String, String>) objectItemList.get(i);
                String value = map.get(operationKey);
                total += Integer.parseInt(value);
            }
            avg=(double)total/objectItemList.size();
        }else if(valueInputFormat.equals("valueList")){
            List<Integer> valueList = (List<Integer>) objectList;
            for (int i = 0; i < valueList.size(); i++) {
                total += valueList.get(i);
            }
            avg=(double)total/valueList.size();
        }
        return avg;
    }

    @Format(methodTask = "max")
    public double calculateMax(Object objectList,String operationKey,String valueInputFormat){
        int max=0;
        if(valueInputFormat.equals("objectList")) {
            List<Object> objectItemList = (List<Object>) objectList;
            for (int i = 0; i < objectItemList.size(); i++) {
                HashMap<String, String> map = (HashMap<String, String>) objectItemList.get(i);
                String value = map.get(operationKey);
                if (Integer.parseInt(value) > max) {
                    max = Integer.parseInt(value);
                }
            }
        }else if(valueInputFormat.equals("valueList")){
            List<Integer> valueList = (List<Integer>) objectList;
            for (int i = 0; i < valueList.size(); i++) {
                if(valueList.get(i)>max){
                    max=valueList.get(i);
                }
            }
        }
        return max;
    }


    @Format(methodTask = "min")
    public double calculateMin(Object objectList,String operationKey,String valueInputFormat){
        int min=Integer.MAX_VALUE;
        if(valueInputFormat.equals("objectList")) {
            List<Object> objectItemList = (List<Object>) objectList;
            for (int i = 0; i < objectItemList.size(); i++) {
                HashMap<String, String> map = (HashMap<String, String>) objectItemList.get(i);
                String value = map.get(operationKey);
                if (Integer.parseInt(value) < min) {
                    min = Integer.parseInt(value);
                }
            }
        }else if(valueInputFormat.equals("valueList")){
            List<Integer> valueList = (List<Integer>) objectList;
            for (int i = 0; i < valueList.size(); i++) {
                if(valueList.get(i)<min){
                    min=valueList.get(i);
                }
            }
        }
        return min;
    }

}
