package com.hrmsys.action;

import javax.servlet.ServletContext;

import org.apache.struts2.ServletActionContext;

import com.hrmsys.model.Department;
import com.hrmsys.service.DeptService;
import com.hrmsys.service.SearchService;

public class DeptAction extends BaseAction{
	private DeptService deptService;
	private Department dept;
	private String page;
	private String rows;
	// 按条件查询的内容
	private String condition;
	//删除的部门的编号字符串
	private String ids;
	private String deptId;
	
	public void list(){
		String deptJson = null;
		deptJson = deptService.getAll(page, rows);
		this.out(deptJson);
	}
	
	public void listByCondition(){
		String json = deptService.getDeptByCondition(condition, page, rows);
		this.out(json);
	}
	
	public void show(){
		String deptJson = deptService.getAll();
		this.out(deptJson);
	}
	
	public void save(){
		String msg = deptService.save(dept);
		this.out("{\"success\": true, \"msg\":\""+ msg +"\"}");
	}
	
	public void delete(){
		String msg = deptService.delete(this.getIds());
		this.out("{success: true, msg: '"+msg+"'}");
	}
	
	public void intoUpdate(){
		String deptJson = deptService.listById(deptId);
		this.out(deptJson);
	}
	
	public void ids(){
		String idJson = deptService.getAllId();
		this.out(idJson);
	}
	
	public void getMaxId(){
		String Id = deptService.getMaxId();
		this.out(Id);
	}
	
	public void allDeptName(){
		String names = deptService.getAll();
		this.out(names);
	}
	
	public void getNumById(){
		int num = deptService.getNumById(deptId);
//		String dir = 
		this.out(String.valueOf(num));
	}
	
	public void getEmpsById(){
		String json = deptService.getEmpsById(deptId);
		this.out(json);
	}
	
	/**
	 * set/get Method
	 * @return
	 */
	public DeptService getDeptService() {
		return deptService;
	}

	public void setDeptService(DeptService deptService) {
		this.deptService = deptService;
	}

	public Department getDept() {
		return dept;
	}

	public void setDept(Department dept) {
		this.dept = dept;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public void setPage(String page) {
		this.page = page;
	}
	
	public void setRows(String rows) {
		this.rows = rows;
	}
	
	public String getPage() {
		return page;
	}
	
	public String getRows() {
		return rows;
	}
	
}
