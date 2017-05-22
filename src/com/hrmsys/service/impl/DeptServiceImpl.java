package com.hrmsys.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.List;

import net.sf.json.JSONArray;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.DepartmentDAO;
import com.hrmsys.enums.StaticValue;
import com.hrmsys.model.Department;
import com.hrmsys.model.Employee;
import com.hrmsys.service.DeptService;
import com.hrmsys.service.EmpService;

public class DeptServiceImpl implements DeptService {
	private DepartmentDAO deptDAO;
	private EmpService empService;

	@Override
	public String getAll() {
		List<Department> depts = deptDAO.findAll(Department.class);
		return JSONArray.fromObject(depts).toString();
	}

	@Override
	public String getAll(String start, String limit) {
		List<Department> depts = deptDAO.findAllDept(start, limit);
		for (Department dept : depts) {
			int num = empService.findNumByDept(dept);
			dept.setDeptNum(num);
		}
		String root = JSONArray.fromObject(depts).toString();
		int totalProperty = deptDAO.findTotal(Department.class);
		return "{\"total\":" + totalProperty + ",\"rows\":" + root + "}";
	}

	@Override
	public String delete(String ids) {
		String[] deptIds = ids.split(",");
		if (deptDAO.delete(deptIds)) {
			return StaticValue.DELETE_SUCCESS;
		}
		return StaticValue.DELETE_FAILURE;
	}

	@Override
	public String save(Department dept) {
		if (deptDAO.saveOrUpdate(dept)) {
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}

	@Override
	public String getDeptByCondition(String condition, 
			String start, String limit) {
		PageBean pageBean = deptDAO.findDeptByCondition(condition,
				 Integer.parseInt(start), Integer
						.parseInt(limit));
		List<Department> depts = pageBean.getRoot();
		for (Department dept : depts) {
			int num = empService.findNumByDept(dept);
			dept.setDeptNum(num);
		}
		pageBean.setRoot(depts);
		JSONArray jsonDept = JSONArray.fromObject(pageBean.getRoot());
		return "{\"total\":" + pageBean.getTotalProperty() + ",\"rows\":" + jsonDept + "}";
	}

	@Override
	public String listById(String deptId) {
		List<Department> depts = deptDAO.findById(deptId);
		return JSONArray.fromObject(depts).toString();
	}

	
	/** getter and setter method **/
	public DepartmentDAO getDeptDAO() {
		return deptDAO;
	}

	public void setDeptDAO(DepartmentDAO deptDAO) {
		this.deptDAO = deptDAO;
	}

	public EmpService getEmpService() {
		return empService;
	}

	public void setEmpService(EmpService empService) {
		this.empService = empService;
	}

	@Override
	public String getAllId() {
		// TODO Auto-generated method stub
		List<String> Ids = deptDAO.getAllId();
		return JSONArray.fromObject(Ids).toString();
	}

	@Override
	public String getMaxId() {
		// TODO Auto-generated method stub
		List<String> Id = deptDAO.getMaxId();
		return JSONArray.fromObject(Id).toString();
	}

	@Override
	public int getNumById(String deptId) {
		// TODO Auto-generated method stub
		Department dept = new Department();
		dept.setDeptId(deptId);
		int num = empService.findNumByDept(dept);
		return num;
	}

	@Override
	public String getEmpsById(String deptId) {
		// TODO Auto-generated method stub
		Department dept = new Department();
		dept.setDeptId(deptId);
		String json = empService.getEmpsByDept(deptId);
		return json;
	}

}
