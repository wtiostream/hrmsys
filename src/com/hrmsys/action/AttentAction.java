package com.hrmsys.action;

import java.sql.Date;

import com.hrmsys.service.AttentService;

public class AttentAction extends BaseAction{
	private String page;
	private String rows;
	private String condition;
	private String empId;
	private AttentService attentService;
	
	public void listAll(){
		String json = attentService.getlist(page,rows);
		this.out(json);
	}
	
	public void getlistByConditon(){
		String condition = this.getRequest().getParameter("condition");
		String json = attentService.getlistByCondition(condition, page, rows, empId);
		this.out(json);
	}
	
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getRows() {
		return rows;
	}
	public void setRows(String rows) {
		this.rows = rows;
	}
	public void setAttentService(AttentService attentService) {
		this.attentService = attentService;
	}
	public AttentService getAttentService() {
		return attentService;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getEmpId() {
		return empId;
	}
	public void setConditon(String condition) {
		this.condition = condition;
	}
	public String getConditon() {
		return condition;
	}
}
