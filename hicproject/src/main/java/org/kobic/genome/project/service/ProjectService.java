package org.kobic.genome.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.kobic.genome.project.mapper.ProjectMapper;
import org.kobic.genome.project.vo.HiCInteractionPairCommonVo;
import org.kobic.genome.project.vo.HiCInteractionPairVo;
import org.springframework.stereotype.Service;

@Service(value = "projectService")
public class ProjectService {
	@Resource(name = "projectMapper")
	private ProjectMapper projectMapper;

	public HiCInteractionPairCommonVo getHicIneractionPairCommonInfo( int windowSize ) {
		Map<String, Integer> paramMap = new HashMap<String, Integer>();
		paramMap.put("window_size", windowSize);
		 
		return this.projectMapper.getHicIneractionPairCommonInfo(paramMap);
	}

	public List<HiCInteractionPairVo> getCurrentHicInteractionPairInfo( int currentPos, HiCInteractionPairCommonVo vo ) {
		Map<String, Integer> paramMap = new HashMap<String, Integer>();
		paramMap.put("pos", currentPos );
		paramMap.put("window_size", vo.getWindowSize());
		paramMap.put("base", vo.getStartPt());
		 
		return this.projectMapper.getCurrentHicInteractionPairInfo(paramMap);
	}
}
