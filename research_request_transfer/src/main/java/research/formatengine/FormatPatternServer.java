package research.formatengine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import research.ResearchRequestTransferApplication;

import java.util.ArrayList;
import java.util.Arrays;


/**
 * Created by nuwantha on 8/29/16.
 */


public class FormatPatternServer {
    private static ArrayList<String> dateFormatPattern=new ArrayList<>();
    private static ArrayList<String> numberFormatPattern=new ArrayList<>();
    private static FormatPatternServer formatPatternServer;

    private static final Logger logger= LoggerFactory.getLogger(FormatPatternServer.class);

    private FormatPatternServer() {

        String[] datePattern = new String[] {"dd-MM-yy","dd-MMM-yy","dd-MM-yy","dd-MMM-yy","MM-dd-yyyy","MMM-dd-yyyy","yyyy-MM-dd","yyyy-MMM-dd","yyyy-MM-dd HH:mm:ss"};
        dateFormatPattern.addAll(Arrays.asList(datePattern));

        String[] numberPattern = new String[] {"###,###.###","###,###.##","000000.000","$###,###","$###,###.000","-###,###.000","-###,###"};
        numberFormatPattern.addAll(Arrays.asList(numberPattern));
    }

    public static FormatPatternServer getFormatPatternServer() {
        if (formatPatternServer == null) {
            formatPatternServer = new FormatPatternServer();
        }
        return formatPatternServer;
    }



    public ArrayList<String> getDateFormatPattern(){
        return dateFormatPattern;
    }

    public ArrayList<String> getNumberFormatPattern(){
        return numberFormatPattern;
    }



}
