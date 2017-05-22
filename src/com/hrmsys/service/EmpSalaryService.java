package com.hrmsys.service;

import com.hrmsys.model.EmpSalary;

public interface EmpSalaryService {
	/**
	 * 得到所有的员工薪资
	 * （empName,empId,subsidy,basicwage,totalsalary）
	 */
	public String getLists(String page, String rows);
	/**
	 * 根据条件查询
	 */
	public String getListByCondition(String condition, String page, String rows);
	/**
	 * 保存
	 */
	public String save(EmpSalary empSal);
	
}
