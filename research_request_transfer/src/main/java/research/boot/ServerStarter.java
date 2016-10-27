package research.boot;

import org.slf4j.LoggerFactory;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by nuwantha on 10/13/16.
 */
public class ServerStarter {
    private AbstractApplicationContext applicationContext;

    public static void main(String[] args) {
        new ServerStarter().start();
    }


    public void start() {
        org.slf4j.Logger logger = LoggerFactory.getLogger("ServerStarter.class");
        logger.info("server is started");
        applicationContext = new ClassPathXmlApplicationContext("server-spring-context.xml");
        applicationContext.registerShutdownHook();
    }

}
