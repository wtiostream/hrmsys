package com.hrmsys.service.impl;

import java.util.List;

import net.sf.json.JSONArray;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.EmpSalaryDAO;
import com.hrmsys.enums.StaticValue;
import com.hrmsys.model.EmpSalary;
import com.hrmsys.service.EmpSalaryService;

public class EmpSalaryServiceImpl implements EmpSalaryService{
	private EmpSalaryDAO empSalaryDao;
	
	@Override
	public String getLists(String page, String rows) {
		// TODO Auto-generated method stub
		List<EmpSalary> empSal = empSalaryDao.findAll(Integer.parseInt(page), Integer.parseInt(rows));
		return JSONArray.fromObject(empSal).toString();
	}

	@Override
	public String getListByCondition(String condition, String page, String rows) {
		PageBean pageBean = empSalaryDao.findByCondition(condition, Integer.parseInt(page), Integer.parseInt(rows));
		String tRecordJson = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{\"total\":" + pageBean.getTotalProperty() + ",\"rows\":" + tRecordJson + "}";
	}

	@Override
	public String save(EmpSalary empSal) {
		// TODO Auto-generated method stub
		if(empSalaryDao.save(empSal)){
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}
	
	
	//setter/getter method
	public EmpSalaryDAO getEmpSalaryDao() {
		return empSalaryDao;
	}

	public void setEmpSalaryDao(EmpSalaryDAO empSalaryDao) {
		this.empSalaryDao = empSalaryDao;
	}
	
	

}
