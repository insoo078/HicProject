package org.kobic.genome.project.vo;

public class InteractionVo {
	private String chr;
	private int bin1;
	private int bin2;
	private double count;

	public String getChr() {
		return chr;
	}
	public void setChr(String chr) {
		this.chr = chr;
	}
	public int getBin1() {
		return bin1;
	}
	public void setBin1(int bin1) {
		this.bin1 = bin1;
	}
	public int getBin2() {
		return bin2;
	}
	public void setBin2(int bin2) {
		this.bin2 = bin2;
	}
	public double getCount() {
		return count;
	}
	public void setCount(double count) {
		this.count = count;
	}
}
