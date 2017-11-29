package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Theme;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Theme entity.
 */
public interface ThemeSearchRepository extends ElasticsearchRepository<Theme, Long> {
}
