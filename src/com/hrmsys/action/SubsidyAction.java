package com.hrmsys.action;

import com.hrmsys.model.EmpSubsidy;
import com.hrmsys.service.SubsidyService;

public class SubsidyAction extends BaseAction{
	private SubsidyService subsidyService;
	private String condition;
	private EmpSubsidy sub;
	private String empId;
	private String ids;
	private String page;
	private String rows;
	
	public void list(){
		String json = subsidyService.getAll(page, rows);
		this.out(json);
	}
	
	public void listByCondition(){
		String json = subsidyService.getInfoByCondition(condition, page, rows);
		this.out(json);
	}
	
	public void save(){
		String msg = subsidyService.save(sub);
		this.out("{\"success\": true, \"msg\":\""+ msg +"\"}");		
	}

	public void delete(){
		String msg = subsidyService.delete(ids);
		this.out("{\"success\": true, \"msg\":\""+ msg +"\"}");
	}
	
	public void getInfoByEmpId(){
		String json = subsidyService.listById(empId);
		this.out(json);
	}
	
	
	//setter/getter method
	public SubsidyService getSubsidyService() {
		return subsidyService;
	}
	public void setSubsidyService(SubsidyService subsidyService) {
		this.subsidyService = subsidyService;
	}
	public String getCondition() {
		return condition;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
	public EmpSubsidy getSub() {
		return sub;
	}
	public void setSub(EmpSubsidy sub) {
		this.sub = sub;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getIds() {
		return ids;
	}
	public void setIds(String ids) {
		this.ids = ids;
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
	
	
}
