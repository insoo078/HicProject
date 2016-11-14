package org.kobic.genome.project.mapper;

import java.util.Map;

import org.kobic.genome.project.vo.HiCInteractionPairCommonVo;
import org.kobic.genome.project.vo.HiCInteractionPairVo;
import org.springframework.stereotype.Repository;

@Repository(value = "projectMapper")
public interface ProjectMapper {
	public HiCInteractionPairCommonVo getHicIneractionPairCommonInfo( Map<String, Integer> paramMap );
	public HiCInteractionPairVo getCurrentHicInteractionPairInfo( Map<String, Integer> paramMap );
}
