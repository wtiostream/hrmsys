package com.hrmsys.model;

import java.util.Date;


public class Attent implements java.io.Serializable{
	private int attentId;
	private String empId;
	private Date attentTime;
	private Date amTime;
	private Date pmTime;
	private int status;
	
	public Attent() {
		// TODO Auto-generated constructor stub
	}

	public int getAttentId() {
		return attentId;
	}

	public void setAttentId(int attentId) {
		this.attentId = attentId;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public Date getAttentTime() {
		return attentTime;
	}

	public void setAttentTime(Date attentTime) {
		this.attentTime = attentTime;
	}

	public Date getAmTime() {
		return amTime;
	}
	public Date getPmTime() {
		return pmTime;
	}
	
	public void setAmTime(Date amTime) {
		this.amTime = amTime;
	}
	
	public void setPmTime(Date pmTime) {
		this.pmTime = pmTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
}
