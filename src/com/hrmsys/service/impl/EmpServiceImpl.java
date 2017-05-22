package com.hrmsys.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import com.hrmsys.bean.EmployeeBean;
import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.EmployeeDAO;
import com.hrmsys.enums.StaticValue;
import com.hrmsys.model.Department;
import com.hrmsys.model.EmpSalary;
import com.hrmsys.model.EmpSubsidy;
import com.hrmsys.model.Employee;
import com.hrmsys.service.EmpSalaryService;
import com.hrmsys.service.EmpService;
import com.hrmsys.service.SubsidyService;
import com.hrmsys.util.ConditionValidate;
import com.hrmsys.util.FileExport;

public class EmpServiceImpl implements EmpService {

	private EmployeeDAO empDAO;
	private EmpSalaryService empSalaryService;
	private SubsidyService subsidyService;
	private static int subid = 2;

	@Override
	public int findNumByDept(Department dept) {
		List<Employee> emps = empDAO.findByDept(dept);
		if (emps != null)
			return emps.size();
		return 0;
	}
	
	@Override
	public String getEmpsByDept(String deptId) {
		// TODO Auto-generated method stub
		Department dept = new Department();
		dept.setDeptId(deptId);
		List<Employee> emps = empDAO.findByDept(dept);
		return JSONArray.fromObject(emps).toString();
	}
	
	@Override
	public String getAll(String start, String limit) {
		List<Employee> emps = empDAO.findAll(Integer.parseInt(start), Integer.parseInt(limit));
		String json = null;
		if (emps.size() != 0) {
			json = JSONArray.fromObject(emps).toString();
		}
		int totalProperty = empDAO.findTotal(Employee.class);
		return "{\"total\":"+totalProperty+",\"rows\":"+json+"}";
	}

	@Override
	public String findByDeptId(String deptId) {
		Department dept = new Department();
		dept.setDeptId(deptId);
		List<Employee> emps = empDAO.findByDept(dept);
		String json = JSONArray.fromObject(emps).toString();
		return json;
	}

	@Override
	public String listByCondition(String condition,
			String start, String limit) {		
		PageBean pageBean = empDAO.listByCondition(condition,Integer.parseInt(start), Integer.parseInt(limit));
		String json = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{\"total\":"+pageBean.getTotalProperty()+",\"rows\":"+json+"}";
	}

	@Override
	public String save(Employee emp) {
		if (empDAO.saveOrUpdate(emp)) {
			//save or update subsidy
//			List<EmpSubsidy> allSub = subsidyService.getAll();
//			for(EmpSubsidy sub : allSub){
//				if(sub.getEmpId().equals(emp.getEmpId())){
//					//update
//					sub.setEmpName(emp.getEmpName());
//					String msg1 = subsidyService.save(sub);
////					return;
//				}
//			}
//			//add
//			EmpSubsidy bean = new EmpSubsidy();
//			bean.setSubsidyId(subid++);
//			bean.setEmpId(emp.getEmpId());
//			bean.setEmpName(emp.getEmpName());
//			String msg1 = subsidyService.save(bean);
//			System.out.println(msg1);
//			//save or update salary
//			EmpSalary empSal = new EmpSalary();
//			empSal.setDeptId(emp.getDepartment().getDeptId());
//			empSal.setJob(emp.getJob());
//			empSal.setEmpId(emp.getEmpId());
//			empSal.setEmpName(emp.getEmpName());
//			empSal.setEmpSubsidy(bean);
//			String msg2 = empSalaryService.save(empSal);
//			System.out.println(msg2);
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}

	@Override
	public String uploadPhoto(String savePath, File upload) {
		boolean flag = true;
		String msg = null;
		try {
			FileOutputStream fos = new FileOutputStream(savePath);
			FileInputStream fis = new FileInputStream(upload);
			byte[] buffer = new byte[1024];
			int len = 0;
			while ((len = fis.read(buffer)) > 0) {
				fos.write(buffer, 0, len);
			}
		} catch (FileNotFoundException e) {
			flag = false;
			e.printStackTrace();
		} catch (IOException e) {
			flag = false;
			e.printStackTrace();
		} finally {
			if (flag) {
				msg = StaticValue.UPLOAD_SUCCESS;
			} else {
				msg = StaticValue.UPLOAD_FAILURE;
			}
		}
		return msg;
	}

	@Override
	public String isExistByEmpId(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		if(null != emp){
			return emp.getEmpName();
		}
		return "";
	}

	@Override
	public String unique(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		if(null != emp){
			return JSONArray.fromObject(emp).toString();
		}
		return "";
	}
	
	@Override
	public String delete(String ids, String filePath) {
		String[] empIds = ids.split(",");
		for(String empId : empIds){
			Employee emp = empDAO.findByEmpId(empId);
			String urlPath = emp.getEmpPhoto();
			if(urlPath.indexOf("default.gif") < 0){ //默认图片不删除 
				int position = urlPath.lastIndexOf("/");
				File file=new File(filePath +"\\"+ urlPath.substring(position, urlPath.length()));
				 if(file.exists() && file.isFile())
				  file.delete();
			}
		}
		if(empDAO.deleteByEmpId(empIds)){
			return StaticValue.DELETE_SUCCESS;
		}
		return StaticValue.DELETE_FAILURE;
	}

	@Override
	public String listByEmpId(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		return JSONArray.fromObject(emp).toString();
	}	

	public List<EmployeeBean> packageEmp(List<Employee> emps) {
		List<EmployeeBean> empBeans = new ArrayList<EmployeeBean>();
		for(Employee emp : emps){
			EmployeeBean empBean = new EmployeeBean();
			empBean.setEmpNation(emp.getEmpOrigin());
			empBean.setEmpAddress(emp.getEmpAddress());
			empBean.setEmpBirth(emp.getEmpBirth());
			empBean.setEmpEducation(emp.getEmpEducation());
			empBean.setEmpId(emp.getEmpId());
			empBean.setEmpIdcard(emp.getEmpIdcard());
			empBean.setEmpName(emp.getEmpName());
			empBean.setEmpPhoto(emp.getEmpPhoto());
			empBean.setEmpProfession(emp.getEmpProfession());
			empBean.setEmpSchool(emp.getEmpSchool());
			if(emp.getEmpSex() == 1){
				empBean.setEmpSex("男");
			}else{
				empBean.setEmpSex("女");
			}
			empBean.setEmpTelephone(emp.getEmpTelephone());
			empBean.setJob(emp.getJob().getJobName());
			empBean.setDept(emp.getDepartment().getDeptName());
			empBeans.add(empBean);
		}
	
		return empBeans;
	}

	@Override
	public List<EmployeeBean> getEmpList(String empId) {
		List<Employee> emps = new ArrayList<Employee>();
		Employee emp = empDAO.findByEmpId(empId);
		emps.add(emp);
		return this.packageEmp(emps);
	}

	@Override
	public void xlsExport(HttpServletResponse response, String filename) {
		List<Employee> emps = empDAO.findAll(Employee.class);
		List<EmployeeBean> empBeans = this.packageEmp(emps);
		FileExport fileExport = new FileExport();
		fileExport.exportXls(empBeans, filename, response);
	}

	@Override
	public String getMaxId() {
		// TODO Auto-generated method stub
		List<String> Id = empDAO.getMaxId();
		return JSONArray.fromObject(Id).toString();
	}
	
	@Override
	public String getVac(String empId) {
		// TODO Auto-generated method stub
		List<String> vac = empDAO.getVac(empId);
		return JSONArray.fromObject(vac).toString();
	}

	// setter/getter method
	public EmployeeDAO getEmpDAO() {
		return empDAO;
	}

	public void setEmpDAO(EmployeeDAO empDAO) {
		this.empDAO = empDAO;
	}

	public EmpSalaryService getEmpSalaryService() {
		return empSalaryService;
	}

	public void setEmpSalaryService(EmpSalaryService empSalaryService) {
		this.empSalaryService = empSalaryService;
	}

	public SubsidyService getSubsidyService() {
		return subsidyService;
	}

	public void setSubsidyService(SubsidyService subsidyService) {
		this.subsidyService = subsidyService;
	}

}