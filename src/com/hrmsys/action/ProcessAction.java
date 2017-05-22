package com.hrmsys.action;

import java.util.Date;
import java.util.List;

import com.hrmsys.model.Process;
import com.hrmsys.service.ProcessService;
import com.hrmsys.service.UserService;
import com.hrmsys.util.CurrentDate;

public class ProcessAction extends BaseAction{
	private ProcessService processService;
	private UserService userService;
	private Process pro;
	private String empId;
	private String deptId;
	private String page;
	private String rows;
	private String condition;
	
	//新建一个流程
	public void save(){
		int statues = userService.getRoleById(pro.getEmployee().getEmpId());
		Date proTime = CurrentDate.getDateAndTime();
		pro.setProTime(proTime);
		pro.setProStatues(statues + 1);
		String msg = processService.save(pro);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	
	//职员、经理、hr进行中的流程
	public void getonPro(){
		String roleId = this.getRequest().getParameter("roleId");
		String json = processService.getListByempId(empId, condition, page, rows, roleId);
		this.out(json);
	}
	
	//职员、经理、hr完成的流程
	public void getfinishPro(){
		String roleId = this.getRequest().getParameter("roleId");
		String json = processService.getlistOver(empId, condition, page, rows, roleId);
		this.out(json);
	}
	
	//部门经理待审核的流程
	public void getProsByDeptId(){
		String json = processService.getListBystaId(deptId,page,rows);
		this.out(json);
	}
	
	//hr待审核的流程
	public void getProsByStaId(){
		String json = processService.getListById(page, rows);
		this.out(json);
	}
	
	//boss待审核的流程
	public void getProsByboss(){
		String json = processService.getProsByboss(page, rows);
		this.out(json);
	}
	
	//经理审核通过
	public void nextPro(){
		String empName = this.getRequest().getParameter("empName");
		Process proNew = processService.getVoByProId(String.valueOf(pro.getProcessId())).get(0);
		proNew.setManager(empName);
		proNew.setProStatues(proNew.getProStatues() + 1);
		proNew.setSuggestOne("通过");
		String msg = processService.save(proNew);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	
	//hr审核通过,移交下一节点
	public void finishPro(){
		String empName = this.getRequest().getParameter("empName");
		Process proNew = processService.getVoByProId(String.valueOf(pro.getProcessId())).get(0);
		proNew.setHr(empName);
		proNew.setProStatues(proNew.getProStatues() + 1);
		proNew.setSuggestTwo("通过");
		String msg = processService.save(proNew);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	
	//boss结束节点
	public void overPro(){
		String empName = this.getRequest().getParameter("empName");
		Process proNew = processService.getVoByProId(String.valueOf(pro.getProcessId())).get(0);
		proNew.setBoss(empName);
		proNew.setProStatues(proNew.getProStatues() + 1);
		proNew.setSuggestThree("通过");
		String msg = processService.save(proNew);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	
	//部门经理驳回
	public void endPro(){
		String empName = this.getRequest().getParameter("empName");
		String processId = this.getRequest().getParameter("processId");
		Process proNew = processService.getVoByProId(processId).get(0);
		proNew.setManager(empName);
		proNew.setProStatues(Integer.parseInt(this.getRequest().getParameter("proStatues")));
		proNew.setSuggestOne(this.getRequest().getParameter("suggestOne"));
		String msg = processService.save(proNew);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	
	//hr驳回
	public void killPro(){
		String empName = this.getRequest().getParameter("empName");
		String processId = this.getRequest().getParameter("processId");
		Process proNew = processService.getVoByProId(processId).get(0);
		proNew.setHr(empName);
		proNew.setProStatues(Integer.parseInt(this.getRequest().getParameter("proStatues")));
		proNew.setSuggestTwo(this.getRequest().getParameter("suggestTwo"));
		String msg = processService.save(proNew);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	
	public void rejectPro(){
		String empName = this.getRequest().getParameter("empName");
		String processId = this.getRequest().getParameter("processId");
		Process proNew = processService.getVoByProId(processId).get(0);
		proNew.setProStatues(Integer.parseInt(this.getRequest().getParameter("proStatues")));
		proNew.setBoss(empName);
		proNew.setSuggestThree(this.getRequest().getParameter("suggestThree"));
		String msg = processService.save(proNew);
		this.out("{\"success\": true, \"msg\":\""  + msg + "\"}");
	}
	
	// set and get method
	public void setProcessService(ProcessService processService) {
		this.processService = processService;
	}
	
	public ProcessService getProcessService() {
		return processService;
	}

	public Process getPro() {
		return pro;
	}

	public void setPro(Process pro) {
		this.pro = pro;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public UserService getUserService() {
		return userService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	public String getDeptId() {
		return deptId;
	}
	public void setRows(String rows) {
		this.rows = rows;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getRows() {
		return rows;
	}
	public String getPage() {
		return page;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
	public String getCondition() {
		return condition;
	}

}
