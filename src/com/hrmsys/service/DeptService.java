package com.hrmsys.service;


import com.hrmsys.model.Department;

public interface DeptService {
	/**
	 * 查询所有部门
	 * @param type
	 * @return
	 */
	public String getAll(String start, String limit);
	/**
	* 方法名：
	* 描     述：保存部门
	* 参数: dept
	* @author wt
	* @date 2017-04-20
	* @return msg
	 */
	public String save(Department dept);
	/**
	 * 删除部门
	 * @param ids 部门编号序列
	 * @return
	 */
	public String delete(String ids);
	/**
	 * 按条件查询
	 * @param condition
	 * @param conditionValue
	 * @return json
	 */
	public String getDeptByCondition(String condition,  String start, String limit);
	/**
	 * 按id查询
	 * @param deptId
	 * @return
	 */
	public String listById(String deptId);
	public int getNumById(String deptId);
	public String getEmpsById(String deptId);
	public String getAll();
	public String getAllId();
	public String getMaxId();

}
