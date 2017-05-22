package com.hrmsys.dao;

import java.util.List;

import com.hrmsys.bean.PageBean;
import com.hrmsys.model.Process;

public interface ProcessDAO {
	//根据员工编号查进度
	public PageBean getListByempId(String empId, String condition, int page, int rows, String roleId);
	//保存一个流程
	public boolean save(Process pro);
	//根据部门审批流程
	public List<Process> getListBystaId(String deptId, int page, int rows);
	//根据主键查进度
	public List<Process> getStaByProId(String proId);
	//根据状态审批流程
	public List<Process> getListById(int page, int rows);
	//根据编号查询已结束流程
	public PageBean getlistOver(String empId, String condition, int page, int rows, String roleId);
	//boss待审核的流程
	public List<Process> getProsByboss(int page, int rows);
	
}
