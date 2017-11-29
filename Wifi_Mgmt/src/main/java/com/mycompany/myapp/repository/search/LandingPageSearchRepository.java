package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.LandingPage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LandingPage entity.
 */
public interface LandingPageSearchRepository extends ElasticsearchRepository<LandingPage, Long> {
}
