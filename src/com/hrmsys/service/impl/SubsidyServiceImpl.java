package com.hrmsys.service.impl;

import java.util.List;

import net.sf.json.JSONArray;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.SubsidyDAO;
import com.hrmsys.enums.StaticValue;
import com.hrmsys.model.EmpSubsidy;
import com.hrmsys.service.SubsidyService;

public class SubsidyServiceImpl implements SubsidyService{
	private SubsidyDAO subsidyDao;
		
	@Override
	public String getAll(String page, String rows) {
		// TODO Auto-generated method stub
		List<EmpSubsidy> subs = subsidyDao.findAll(Integer.parseInt(page), Integer.parseInt(rows));
		return JSONArray.fromObject(subs).toString();
	}

	@Override
	public String save(EmpSubsidy sub) {
		// TODO Auto-generated method stub
		if(subsidyDao.saveOrUpdate(sub)){
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}

	@Override
	public String delete(String ids) {
		// TODO Auto-generated method stub
		String[] arr_id = ids.split(",");
		if(subsidyDao.delete(arr_id)){
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}

	@Override
	public String getInfoByCondition(String condition, String page, String rows) {
		// TODO Auto-generated method stub
		PageBean pageBean = subsidyDao.findByCondition(condition, Integer.parseInt(page),Integer.parseInt(rows));
		String json = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{\"total\":"+pageBean.getTotalProperty()+",\"rows\":"+json+"}";
	}

	@Override
	public String listById(String empId) {
		// TODO Auto-generated method stub
		List<EmpSubsidy> list = subsidyDao.findByEmpId(empId);
		return JSONArray.fromObject(list).toString();
	}
	
	//set get
	public SubsidyDAO getSubsidyDao() {
		return subsidyDao;
	}
	public void setSubsidyDao(SubsidyDAO subsidyDao) {
		this.subsidyDao = subsidyDao;
	}

	@Override
	public List<EmpSubsidy> getAll() {
		// TODO Auto-generated method stub
		List<EmpSubsidy> lists = subsidyDao.getAll();
		return lists;
	}
}
