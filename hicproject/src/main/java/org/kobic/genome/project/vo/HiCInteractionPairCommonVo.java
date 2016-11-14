package org.kobic.genome.project.vo;

import java.io.Serializable;

public class HiCInteractionPairCommonVo  implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private int startPt;
	private int entPt;
	private int maxFreq;
	private int binSize;
	private int widnowSize;

	public int getStartPt() {
		return startPt;
	}
	public void setStartPt(int startPt) {
		this.startPt = startPt;
	}
	public int getEntPt() {
		return entPt;
	}
	public void setEntPt(int entPt) {
		this.entPt = entPt;
	}
	public int getMaxFreq() {
		return maxFreq;
	}
	public void setMaxFreq(int maxFreq) {
		this.maxFreq = maxFreq;
	}
	public int getBinSize() {
		return binSize;
	}
	public void setBinSize(int binSize) {
		this.binSize = binSize;
	}
	public int getWidnowSize() {
		return widnowSize;
	}
	public void setWidnowSize(int widnowSize) {
		this.widnowSize = widnowSize;
	}
}
