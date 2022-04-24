package com.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import static java.time.LocalTime.now;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private static final Logger log = LoggerFactory.getLogger(WebSocketConfig.class);


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/handler").setAllowedOriginPatterns("*").withSockJS();
//        registry.addEndpoint("/handler").setAllowedOriginPatterns("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry brokerRegistry) {

        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(1);
        threadPoolTaskScheduler.setThreadGroupName("websocket-heartbeat-");
        threadPoolTaskScheduler.initialize();


        /*
         * The application destination prefix is an arbitrary prefix to
         * differentiate between messages that need to be routed to
         * message-handling methods for application level work vs messages to be
         * routed to the broker to broadcast to subscribed clients. After
         * application level work is finished the message can be routed to
         * broker for broadcasting.
         */
        brokerRegistry.setApplicationDestinationPrefixes("/game");

        /*
         * The list of destination prefixes provided in this are based on what
         * broker is getting used. In this case we will use in-memory broker
         * which doesn't have any such requirements. For the purpose of
         * maintaining convention the "/topic" and the "/queue" prefixes are
         * chosen. The convention dictates usage of "/topic" destination for
         * pub-sub model targeting many subscribers and the "/queue" destination
         * for point to point messaging.
         */
        brokerRegistry
                .enableSimpleBroker("/topic", "/queue")
                .setTaskScheduler(threadPoolTaskScheduler)
                .setHeartbeatValue(new long[] {10000, 10000});

        /*
         * For configuring dedicated broker use the below code.
         */
//        brokerRegistry
//                .enableStompBrokerRelay("/topic", "/queue")
//                .setRelayHost("lionfish.rmq.cloudamqp.com")
//                .setRelayPort(61613)
//                .setClientLogin("ttjsgdvi:ttjsgdvi")
//                .setClientPasscode("oGTR3h0G7iByuizO0gwI3r-lPDdnoT6h");
//        brokerRegistry.setPreservePublishOrder(true);
    }

    @EventListener(SessionConnectEvent.class)
    public void handleWebsocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        log.info("Received a new web socket connection: SESSION {}; at {}", headers, now());
    }

    @EventListener(SessionDisconnectEvent.class)
    public void handleWebsocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        log.info("Session Disconnected [sessionId: " + sha.getSessionId() + " : close status" + event.getCloseStatus() + "]");
    }
}
