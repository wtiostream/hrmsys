package com.hrmsys.model;

public class EmpSubsidy	implements java.io.Serializable {
	private String empId;
	private int subsidyId; 
	private String empName;
	private float subsidyTraffic;
	private float subsidyEatery;
	private float subsidyTel;
	
	public EmpSubsidy() {
		// TODO Auto-generated constructor stub
	}
	
	public EmpSubsidy(String empId, int subsidyId, String empName,
			 float subsidyTraffic, float subsidyEatery,
			float subsidyTel) {
		super();
		this.empId = empId;
		this.subsidyId = subsidyId;
		this.empName = empName;
		this.subsidyTraffic = subsidyTraffic;
		this.subsidyEatery = subsidyEatery;
		this.subsidyTel = subsidyTel;
	}
	
	
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public int getSubsidyId() {
		return subsidyId;
	}
	public void setSubsidyId(int subsidyId) {
		this.subsidyId = subsidyId;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public float getSubsidyTraffic() {
		return subsidyTraffic;
	}
	public void setSubsidyTraffic(float subsidyTraffic) {
		this.subsidyTraffic = subsidyTraffic;
	}
	public float getSubsidyEatery() {
		return subsidyEatery;
	}
	public void setSubsidyEatery(float subsidyEatery) {
		this.subsidyEatery = subsidyEatery;
	}
	public float getSubsidyTel() {
		return subsidyTel;
	}
	public void setSubsidyTel(float subsidyTel) {
		this.subsidyTel = subsidyTel;
	}
	
}
