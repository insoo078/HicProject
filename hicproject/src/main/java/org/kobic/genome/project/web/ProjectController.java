package org.kobic.genome.project.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.kobic.genome.project.service.ProjectService;
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
	public String get_data(HttpServletRequest request) {
		Gson gson = new Gson();

		String loci = request.getParameter("loci");
		String windowSize = request.getParameter("window_size");
		String boundaryRange = request.getParameter("boundary_range");
		
		System.out.println( loci + " " + windowSize + " " + boundaryRange );
		
		return gson.toJson( this.projectService.getInteractions( loci, windowSize, boundaryRange ) );
	}
	
	@RequestMapping(value = "get_gene_symbols", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String getGeneSymbolData(HttpServletRequest request) {
		Gson gson = new Gson();
		
		String param = request.getParameter("symbol");

		return gson.toJson( this.projectService.getLocis(param) );
	}
}
