package org.kobic.genome.project.web;

import javax.annotation.Resource;

import org.kobic.genome.project.service.ProjectService;
import org.kobic.genome.project.vo.HiCInteractionPairCommonVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
public class ProjectController {
	
	@Resource(name = "projectService")
	private ProjectService projectService;

	@RequestMapping(value = "get_data", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String get_data() {
		Gson gson = new Gson();

		HiCInteractionPairCommonVo vo = this.projectService.getHicIneractionPairCommonInfo( 1000 );

		vo.setPairList( this.projectService.getCurrentHicInteractionPairInfo( 16262500, vo ) );

		return gson.toJson( vo );
	}	
}
