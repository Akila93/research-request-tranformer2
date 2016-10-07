package research.formatengine;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;

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
        System.out.println(pattern);

        String newStr = oldVersion.replaceAll("[$,]", "");
        double value=Double.parseDouble(newStr);
        DecimalFormat decimalFormat = new DecimalFormat(pattern);
        String newVersion = decimalFormat.format(value);
        return newVersion;
    }
}
