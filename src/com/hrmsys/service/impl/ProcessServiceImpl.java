package com.hrmsys.service.impl;

import java.util.List;

import net.sf.json.JSONArray;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.ProcessDAO;
import com.hrmsys.enums.StaticValue;
import com.hrmsys.model.Process;
import com.hrmsys.service.ProcessService;

public class ProcessServiceImpl implements ProcessService{
	private ProcessDAO processDao;

	@Override
	public String getListByempId(String empId, String condition, String page, String rows, String roleId) {
		// TODO Auto-generated method stub
		PageBean pageBean = processDao.getListByempId(empId, condition, Integer.parseInt(page), Integer.parseInt(rows), roleId);
		String json = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{\"total\":"+pageBean.getTotalProperty()+",\"rows\":"+json+"}";
	}
	@Override
	public String save(Process pro) {
		// TODO Auto-generated method stub
		if(processDao.save(pro)){
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}
	@Override
	public String getListBystaId(String deptId, String page, String rows) {
		// TODO Auto-generated method stub
		List<Process> lists = processDao.getListBystaId(deptId, Integer.parseInt(page), Integer.parseInt(rows));
		String json = JSONArray.fromObject(lists).toString();
		int total = lists.size();
		return "{\"total\":"+total+",\"rows\":"+json+"}";
	}
	@Override
	public List<Process> getVoByProId(String proId) {
		// TODO Auto-generated method stub
		List<Process> list = processDao.getStaByProId(proId);
		return list;
	}
	
	@Override
	public String getListById(String page, String rows) {
		// TODO Auto-generated method stub
		List<Process> lists = processDao.getListById(Integer.parseInt(page), Integer.parseInt(rows));
		String json = JSONArray.fromObject(lists).toString();
		int total = lists.size();
		return "{\"total\":"+total+",\"rows\":"+json+"}";
	}
	
	@Override
	public String getlistOver(String empId, String condition, String page, String rows, String roleId) {
		// TODO Auto-generated method stub
		PageBean pageBean = processDao.getlistOver(empId, condition, Integer.parseInt(page), Integer.parseInt(rows), roleId);
		String json = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{\"total\":"+pageBean.getTotalProperty()+",\"rows\":"+json+"}";
	}
	@Override
	public String getProsByboss(String page, String rows) {
		List<Process> lists = processDao.getProsByboss(Integer.parseInt(page), Integer.parseInt(rows));
		String json = JSONArray.fromObject(lists).toString();
		int total = lists.size();
		return "{\"total\":"+total+",\"rows\":"+json+"}";
	}

	
	// set and get method
	public void setProcessDao(ProcessDAO processDao) {
		this.processDao = processDao;
	}
	public ProcessDAO getProcessDao() {
		return processDao;
	}
}
