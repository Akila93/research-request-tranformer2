package research.formatengine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import research.ResearchRequestTransferApplication;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;

/**
 * Created by nuwantha on 8/29/16.
 */
public class NumberFormatter implements Formatter {

    private static final Logger logger= LoggerFactory.getLogger(NumberFormatter.class);
    String pattern="";

    public NumberFormatter(){

    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public String format(String oldVersion){
        String newStr = oldVersion.replaceAll("[$,]","");
        double value=Double.parseDouble(newStr);
        DecimalFormat decimalFormat = new DecimalFormat(pattern);
        String newVersion = decimalFormat.format(value);
        return newVersion;
    }
}
