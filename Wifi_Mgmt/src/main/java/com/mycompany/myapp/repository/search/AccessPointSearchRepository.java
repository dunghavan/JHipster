package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.AccessPoint;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AccessPoint entity.
 */
public interface AccessPointSearchRepository extends ElasticsearchRepository<AccessPoint, Long> {
}
