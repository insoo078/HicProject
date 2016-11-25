package org.kobic.genome.project.vo;

public class LocusVo {
	private String chrom;
	private int txStart;
	private int txEnd;
	public String getChrom() {
		return chrom;
	}
	public void setChrom(String chrom) {
		this.chrom = chrom;
	}
	public int getTxStart() {
		return txStart;
	}
	public void setTxStart(int txStart) {
		this.txStart = txStart;
	}
	public int getTxEnd() {
		return txEnd;
	}
	public void setTxEnd(int txEnd) {
		this.txEnd = txEnd;
	}
}
