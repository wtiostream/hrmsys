package com.hrmsys.model;

import java.util.Date;

public class Process implements java.io.Serializable{
	private Integer processId;
	private Employee employee;
	private Integer type;
	private Date beginTime;
	private Date endTime;
	private String reason;
	private String manager;
	private String suggestOne;
	private String hr;
	private String suggestTwo;
	private String boss;
	private String suggestThree;
	private Date proTime;
	private Integer proStatues;
	
	
	public Process() {
		// TODO Auto-generated constructor stub
	}


	public Process(Integer processId, Employee employee, Integer type,
			Date beginTime, Date endTime, String reason, String manager,
			String suggestOne, String boss, String suggestTwo, Date proTime,
			Integer proStatues) {
		super();
		this.processId = processId;
		this.employee = employee;
		this.type = type;
		this.beginTime = beginTime;
		this.endTime = endTime;
		this.reason = reason;
		this.manager = manager;
		this.suggestOne = suggestOne;
		this.boss = boss;
		this.suggestTwo = suggestTwo;
		this.proTime = proTime;
		this.proStatues = proStatues;
	}


	public Integer getProcessId() {
		return processId;
	}


	public void setProcessId(Integer processId) {
		this.processId = processId;
	}

	public Integer getType() {
		return type;
	}


	public void setType(Integer type) {
		this.type = type;
	}


	public Date getBeginTime() {
		return beginTime;
	}


	public void setBeginTime(Date beginTime) {
		this.beginTime = beginTime;
	}


	public Date getEndTime() {
		return endTime;
	}


	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}


	public String getReason() {
		return reason;
	}


	public void setReason(String reason) {
		this.reason = reason;
	}


	public String getManager() {
		return manager;
	}


	public void setManager(String manager) {
		this.manager = manager;
	}


	public String getSuggestOne() {
		return suggestOne;
	}


	public void setSuggestOne(String suggestOne) {
		this.suggestOne = suggestOne;
	}


	public String getBoss() {
		return boss;
	}


	public void setBoss(String boss) {
		this.boss = boss;
	}


	public String getSuggestTwo() {
		return suggestTwo;
	}


	public void setSuggestTwo(String suggestTwo) {
		this.suggestTwo = suggestTwo;
	}


	public Date getProTime() {
		return proTime;
	}


	public void setProTime(Date proTime) {
		this.proTime = proTime;
	}


	public Integer getProStatues() {
		return proStatues;
	}


	public void setProStatues(Integer proStatues) {
		this.proStatues = proStatues;
	}
	
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	public Employee getEmployee() {
		return employee;
	}


	public String getHr() {
		return hr;
	}


	public void setHr(String hr) {
		this.hr = hr;
	}


	public String getSuggestThree() {
		return suggestThree;
	}


	public void setSuggestThree(String suggestThree) {
		this.suggestThree = suggestThree;
	}
	
	
}
