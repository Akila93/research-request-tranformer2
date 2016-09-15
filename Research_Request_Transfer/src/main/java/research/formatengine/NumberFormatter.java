package research.formatengine;

import java.text.DecimalFormat;

/**
 * Created by nuwantha on 8/29/16.
 */
public class NumberFormatter {

    String pattern="";

    NumberFormatter(String pattern){
        this.pattern=pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public String format(String oldVersion){
        DecimalFormat decimalFormat = new DecimalFormat(pattern);
        String newVersion = decimalFormat.format(oldVersion);
        return newVersion;
    }
}
