package org.kobic.genome.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.kobic.genome.project.mapper.ProjectMapper;
import org.kobic.genome.project.vo.HiCInteractionPairCommonVo;
import org.kobic.genome.project.vo.HiCInteractionPairVo;
import org.kobic.genome.project.vo.InteractionVo;
import org.kobic.genome.project.vo.LocusVo;
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

//	public List<PairVo> getCurrentHicInteractionPairInfo( int currentPos, HiCInteractionPairCommonVo vo ) {
	public List<HiCInteractionPairVo> getCurrentHicInteractionPairInfo( int currentPos, HiCInteractionPairCommonVo vo ) {
		Map<String, Integer> paramMap = new HashMap<String, Integer>();
		paramMap.put("pos", currentPos );
		paramMap.put("window_size", vo.getWindowSize());
		paramMap.put("base", vo.getStartPt());
		 
		List<HiCInteractionPairVo> list = this.projectMapper.getCurrentHicInteractionPairInfo(paramMap);

		return list;

//		Map<Integer,Float> map = new HashMap<Integer,Float>();
//		for (HiCInteractionPairVo i : list) map.put( i.getBin(), i.getCount() );
//
//		List<PairVo> pairList = new ArrayList<PairVo>();
//		for(int i=vo.getStartPt(); i<=vo.getEndPt(); i+=vo.getWindowSize()) {
//			PairVo pairVo = new PairVo();
//			pairVo.setPos(i);
//			if( map.containsKey(i) )	pairVo.setCount( map.get(i) );
//			else						pairVo.setCount(0);
//			pairList.add( pairVo );
//		}
//		return pairList;
	}
	
	public List<LocusVo> getLocis( String param ) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("name", param);

		return this.projectMapper.getLocusInfo(paramMap);
	}
	
	public Map<String, Object> getInteractions( String loci, String windowSize, String boundaryRange ) {
		Map<String, String> paramMap = new HashMap<String, String>();
		String[] params = loci.split(":");

		paramMap.put("chrom", params[0]);
		paramMap.put("pos", params[1]);
		paramMap.put("windowSize", windowSize);
		paramMap.put("boundary", boundaryRange);
		
		int startPt = Integer.valueOf(params[1]) - Integer.valueOf(boundaryRange);
		int endPt = Integer.valueOf(params[1]) + Integer.valueOf(boundaryRange);
		
		if( startPt < 1 ) startPt = 1;

		List<InteractionVo> interactionPairList = this.projectMapper.getInteractions(paramMap);
		
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("bait", params[1]);
		retMap.put("startPt", startPt);
		retMap.put("endPt", endPt);
		retMap.put("windowSize", windowSize);
		retMap.put("boundaryRange", boundaryRange);
		retMap.put("interactionPairs", interactionPairList);
		retMap.put("peakValue", this.getPeakValue(interactionPairList) );
		
		return retMap;
	}
	
	private double getPeakValue( List<InteractionVo> lst ) {
		if( lst != null && lst.size() > 0 ) {
			double max = lst.get(0).getCount(); 
			for( int i=1; i<lst.size(); i++) {
				if( max < lst.get(i).getCount() ) max = lst.get(i).getCount();
			}
			return max;
		}
		return 0;
	}
}
