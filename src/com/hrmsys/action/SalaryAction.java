package com.hrmsys.action;

import com.hrmsys.model.EmpSalary;
import com.hrmsys.service.EmpSalaryService;
import com.hrmsys.service.EmpService;

public class SalaryAction extends BaseAction{
	private EmpSalaryService empSalaryService;
	private String condition;
	private String page;
	private String rows;
	private EmpSalary empSal;
	
	public void list(){
		String json = empSalaryService.getLists(page, rows);
		this.out(json);
	}
	
	public void listByCondition(){
		String json = empSalaryService.getListByCondition(condition, page, rows);
		this.out(json);
	}

	public void save(){
		String msg = empSalaryService.save(empSal);
		this.out("{\"success\": true, \"msg\":\""+ msg +"\"}");
	}
	
	
	//setter/getter method
	public String getCondition() {
		return condition;
	}
	public EmpSalaryService getEmpSalaryService() {
		return empSalaryService;
	}

	public void setEmpSalaryService(EmpSalaryService empSalaryService) {
		this.empSalaryService = empSalaryService;
	}

	public void setCondition(String condition) {
		this.condition = condition;
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
