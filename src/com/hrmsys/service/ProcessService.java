package com.hrmsys.service;

import java.util.List;

import com.hrmsys.model.Process;

public interface ProcessService {
	//根据员工编号查流程中进度
	public String getListByempId(String empId, String condition, String page, String rows, String roleId);
	//保存一个流程
	public String save(Process pro);
	//根据部门审批流程
	public String getListBystaId(String deptId, String page, String rows);
	//根据proId查进度
	public List<Process> getVoByProId(String proId);
	//根据状态审批流程(3)
	public String getListById(String page, String rows);
	//根据员工编号查已完成流程
	public String getlistOver(String empId, String condition, String page, String rows, String roleId);
	//boss待审核的流程
	public String getProsByboss(String page, String rows);
}
