package org.kobic.genome.project.mapper;

import java.util.List;
import java.util.Map;

import org.kobic.genome.project.vo.HiCInteractionPairCommonVo;
import org.kobic.genome.project.vo.HiCInteractionPairVo;
import org.kobic.genome.project.vo.InteractionVo;
import org.kobic.genome.project.vo.LocusVo;
import org.springframework.stereotype.Repository;

@Repository(value = "projectMapper")
public interface ProjectMapper {
	public HiCInteractionPairCommonVo getHicIneractionPairCommonInfo( Map<String, Integer> paramMap );
	public List<HiCInteractionPairVo> getCurrentHicInteractionPairInfo( Map<String, Integer> paramMap );
	public List<InteractionVo> getInteractions( Map<String, String> paramMap );
	public List<LocusVo> getLocusInfo( Map<String, String> paramMap );
}