package com.hrmsys.dao;

import java.util.List;

import com.hrmsys.bean.PageBean;
import com.hrmsys.model.EmpSubsidy;

public interface SubsidyDAO {
	/**
	 * 查询所有的内容
	 * @param page
	 * @param rows
	 * @return
	 */
	List<EmpSubsidy> findAll(int page, int rows);
	/**
	 * 	根据条件一键搜
	 */
	PageBean findByCondition(String condition, int page, int rows);
	/**
	 * 删除
	 */
	boolean delete(String[] emp_id);
	/**
	 * 保存或修改
	 */
	boolean saveOrUpdate(EmpSubsidy sub);
	/**
	 * 按empId查询
	 */
	List<EmpSubsidy> findByEmpId(String empId);
	/**
	 * 查询记录数
	 */
	public<T> int findTotal(Class<T> clazz);
	/**
	 * 查询所有的记录
	 */
	public List<EmpSubsidy> getAll();
 	
}
