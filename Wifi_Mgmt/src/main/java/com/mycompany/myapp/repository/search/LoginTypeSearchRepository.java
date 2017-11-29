package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.LoginType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LoginType entity.
 */
public interface LoginTypeSearchRepository extends ElasticsearchRepository<LoginType, Long> {
}
