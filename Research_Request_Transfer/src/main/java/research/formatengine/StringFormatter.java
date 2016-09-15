package research.formatengine;

import research.annotation.Format;

/**
 * Created by nuwantha on 8/29/16.
 */
public class StringFormatter {

    @Format(methodTask = "convertToLower")
    public String convertToLower(Object oldVersion){
        String old = (String) oldVersion;
        return old.toLowerCase();
    }

    @Format(methodTask = "convertToUpper")
    public String convertToHigher(Object oldVersion){
        String old = (String) oldVersion;
        return old.toUpperCase();
    }

    @Format(methodTask = "convertFirstLetterToUpper")
    public String convertFirstLetterToUpper(String oldVersion){
        return oldVersion.substring(0,1).toUpperCase()+oldVersion.substring(1).toLowerCase();
    }
}
