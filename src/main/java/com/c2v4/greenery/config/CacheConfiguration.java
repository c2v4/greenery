package com.c2v4.greenery.config;

import io.github.jhipster.config.JHipsterProperties;
import java.time.Duration;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.c2v4.greenery.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.c2v4.greenery.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.c2v4.greenery.domain.User.class.getName());
            createCache(cm, com.c2v4.greenery.domain.Authority.class.getName());
            createCache(cm, com.c2v4.greenery.domain.User.class.getName() + ".authorities");
            createCache(cm, com.c2v4.greenery.domain.Entry.class.getName());
            createCache(cm, com.c2v4.greenery.domain.Label.class.getName());
            createCache(cm, com.c2v4.greenery.domain.Label.class.getName() + ".entries");
            createCache(cm, com.c2v4.greenery.domain.SchedulerConfig.class.getName());
            createCache(cm, com.c2v4.greenery.domain.SchedulerConfig.class.getName() + ".properties");
            createCache(cm, com.c2v4.greenery.domain.Property.class.getName());
            createCache(cm, com.c2v4.greenery.domain.Rule.class.getName());
            createCache(cm, com.c2v4.greenery.domain.Predicate.class.getName());
            createCache(cm, com.c2v4.greenery.domain.Predicate.class.getName() + ".predicates");
            createCache(cm, com.c2v4.greenery.domain.Expression.class.getName());
            createCache(cm, com.c2v4.greenery.domain.Numeric.class.getName());
            createCache(cm, com.c2v4.greenery.domain.ExecutorConfig.class.getName());
            createCache(cm, com.c2v4.greenery.domain.ExecutorConfig.class.getName() + ".properties");
            createCache(cm, com.c2v4.greenery.domain.ExecutorLabel.class.getName());
            createCache(cm, com.c2v4.greenery.domain.ExecutorType.class.getName());
            createCache(cm, com.c2v4.greenery.domain.ExecutorType.class.getName() + ".executorConfigs");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
