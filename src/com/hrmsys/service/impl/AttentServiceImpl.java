package com.hrmsys.service.impl;

import java.sql.Date;
import java.util.List;

import net.sf.json.JSONArray;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.AttentDAO;
import com.hrmsys.model.Attent;
import com.hrmsys.model.Department;
import com.hrmsys.service.AttentService;

public class AttentServiceImpl implements AttentService{
	private AttentDAO attentDao;

	@Override
	public String getlist(String page, String rows) {
		// TODO Auto-generated method stub
		List<Attent> list = attentDao.getlist(Integer.parseInt(page), Integer.parseInt(rows));
		String root = JSONArray.fromObject(list).toString();
		int totalProperty = attentDao.findTotal(Attent.class);
		return "{\"total\":" + totalProperty + ",\"rows\":" + root + "}";
	}
	
	@Override
	public String getlistByCondition(String time, String page, String rows, String empId) {
		// TODO Auto-generated method stub
		String json = null;
		PageBean pageBean = attentDao.getlistByCondition(time, Integer.parseInt(page), Integer.parseInt(rows),empId);
		if(pageBean.getRoot().size() > 0){
			json = JSONArray.fromObject(pageBean.getRoot()).toString();
		}
		return "{\"total\":"+pageBean.getTotalProperty()+",\"rows\":"+json+"}";

	}
	


	public void setAttentDao(AttentDAO attentDao) {
		this.attentDao = attentDao;
	}
	
	public AttentDAO getAttentDao() {
		return attentDao;
	}
}
